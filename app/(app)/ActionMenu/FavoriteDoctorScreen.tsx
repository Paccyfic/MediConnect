import React,{ReactElement, useEffect, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, Dimensions,TextInput, ScrollView, Pressable} from 'react-native'
import DoctorComponent from '@/components/DoctorComponent';
 import { SvgXml } from "react-native-svg"
import { blueheart } from '@/assets/icons/blueHeart';
import { star } from '@/assets/icons/star';
import data from "../../doctors.json"
import HeaderComponent from '@/components/HeaderComponent';
import SearchComponent from '@/components/SearchComponent';
import FoundDoctorCount from '@/components/FoundDoctorCount';
import NofoundComponent from '@/components/NofoundComponent';
import RemovefavoritePopup from '@/components/RemovefavoritePopup';
import FilterPopup from '@/components/FilterSearchComponent';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '@/ctx/ThemeContext';
import { useContext } from 'react';
import { supabase } from '@/lib/supabase';


const tableName = 'doctors'

const favoriteTable="favorite_doctors"




interface imageMapProp{
    [key:string]:ReturnType<typeof require>
}

const imageMap:imageMapProp = {
    'doctor1.png': require("../../../assets/images/Doctors/doctor1.png"),
    'doctor2.png': require("../../../assets/images/Doctors/doctor2.png"),
    'doctor3.png': require("../../../assets/images/Doctors/doctor3.png"),
    'doctor4.png': require("../../../assets/images/Doctors/doctor4.png"),
    'doctor5.png':require("../../../assets/images/Doctors/doctor5.png")

}
interface iconMappingProp{
    [key :string]:ReactElement
}


interface Doctor{
    id: number,
    first_name: string,
    last_name: string,
    hospital: string,
    rate: string,
    review: string,
    specialization: string,
    about:string
}
interface categoryProp{
    name: string,
    Doctors:Doctor[]
}

export const iconMapping:iconMappingProp = {
    heart: <SvgXml xml={blueheart} />,
    star: <SvgXml xml={star} />,
}



function favoriteDoctorScreen() {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState(data.categories[0])
    const [showpopUp, setShowPopup] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor>()
    const [showFilter, setShowfilter] = useState(false)
    const [doctors,setDoctors]=useState<Doctor[]>([])
    const { theme, changeTheme } = useContext(ThemeContext)
    const [selectedSpecilization, setSelectedSpecilization] = useState<string>("All")
  const [specialization,setSpecialization]=useState<string[]>([])
    const containerStyle = theme === "dark" ? styles.outerDark : styles.outerLight
    const scrollbackColor = theme === "dark" ? styles.scrollDark : styles.scrollLight
    const [loggeduser, setLoggedUser] = useState<string>()
  const [profile, setProfile] = useState<any>(null)
    const [patient_id, setPatient_id] = useState<string>()
    const [favoriteDoctors,setFavoriteDoctors]=useState<Doctor[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      
      const { data: { user },error } = await supabase.auth.getUser()
      if (error) {
        console.error("error fetching user")
      } else {
        setLoggedUser(user?.id)
      }
    }
    fetchUser()
   
  }, [loggeduser])
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggeduser) {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq('auth_id', loggeduser)
          .single()
        if (error) {
          console.error("error while retrieving profile",error)
        } else {
          setProfile(data)
          setPatient_id(data.id)
          console.log(data)
         
        }
        
        
      }
    }
    fetchUserProfile()
  }, [loggeduser])
    
    useEffect(() => {
        async function fetchData() {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return;
            }
            setDoctors(data)
             const uniqueSpecialization = Array.from(new Set(data.map((doctor: Doctor) => doctor.specialization)))
           setSpecialization(["All",...uniqueSpecialization])
           
}

fetchData();
    },[])
    useEffect(() => {
        const fetchFavoritesDoctor = async () => {
            if (patient_id) {
                const { data: fetchdataEntries, error } = await supabase
                    .from(favoriteTable)
                    .select("*")
                    .eq("patient", patient_id)
                if (error) {
                    console.error("error while fetching ")
                }
                const favoritesDoctorsIds = fetchdataEntries?fetchdataEntries.map(entry => entry.favorite_doctor):[]
                const { data: favoriteDoctorData, error: doctorError } = await supabase
                    .from(tableName)
                    .select("*")
                    .in("id", favoritesDoctorsIds)
                if (doctorError) {
                    console.error("error while fetching doctor's data", doctorError)
                    return;
                }
                setFavoriteDoctors(favoriteDoctorData)
                const uniqueSpecialization = Array.from(new Set(favoriteDoctorData.map((doctor: Doctor) => doctor.specialization)))
                setSpecialization(["All",...uniqueSpecialization])
            }
            
        }
        fetchFavoritesDoctor()
     
 },[patient_id])
    const handleSearchPressed = () => {
        setShowSearch(true)
    }
    const handleSearchSubmit = (text: string) => {
        setSearchTerm(text.toLowerCase())
    }
    
    const handleFilter = () => {
        setShowfilter(true)
    }
   const handleRemove = (doctorId: number) => {
      const doctor=doctors.find(doc=>doc.id===doctorId)
        setSelectedDoctor(doctor)
        
    setShowPopup(true)
    console.log("This is clicked doctor",doctor)
  }
     const handleSpecializationChange = (specialization: string) => {
    setSelectedSpecilization(specialization)
    setSearchTerm('')
    
    }
    const handleAddfovorite = async (doctorId: number) => {
    const patientId = patient_id
    const { error } = await supabase.from(favoriteTable).insert({ patient: patientId, favorite_doctor: doctorId })
    if (error) {
      console.error("error while adding doctor to favorite", error)
      return;
    }
   const doctor = doctors.find(doc => doc.id === doctorId);
  if (doctor) {
    setFavoriteDoctors(prev => [...prev, doctor]);
  }
  }
    const handleIconClick = (doctor: Doctor,doctorId:number) => {
    if (favoriteDoctors.includes(doctor)) {
      setSelectedDoctor(doctor);
      setShowPopup(true);
    } else {
      handleAddfovorite(doctorId);
    }
  };
  
     const updateFavoriteDoctors = async () => {
    const { data, error } = await supabase
      .from("favorite_doctors")
      .select("favorite_doctor")
      .eq("patient", patient_id);
    if (error) {
      console.error("Error fetching favorite doctors:", error);
    } else {
    const favoriteDoctorIds = data.map((item: { favorite_doctor: number }) => item.favorite_doctor);

  const { data: favoriteDoctorData, error: doctorError } = await supabase
    .from(tableName)
    .select("*")
    .in("id", favoriteDoctorIds);

  if (doctorError) {
    console.error("Error fetching favorite doctors' data:", doctorError);
    return;
  }

  setFavoriteDoctors(favoriteDoctorData);
    }
  };
    
  const filteredDoctors = favoriteDoctors.filter(doctor => {
    const matchSearchTerm = searchTerm.length > 0 ? doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase())||doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) : true
    const matchSpecialization = selectedSpecilization === 'All' || doctor.specialization === selectedSpecilization
    return matchSearchTerm&&matchSpecialization

    })

   
    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
           <StatusBar style={theme === "dark" ? "light" : "dark"} />
            <View>
                
                <View style={[styles.upper,containerStyle]}>
                    {
                        !showSearch ? (
                            <HeaderComponent
                                onSearchPressed={handleSearchPressed}
                                headerText="Favorite Doctors"
                            
                            />
                        ) : (
                               
                            <SearchComponent
                                    onSearchSubmit={handleSearchSubmit}
                                    filterAction={handleFilter}
                                
                                
                            />
                        )
                    }
                </View>
                <View style={[styles.categoryBtnView,containerStyle]}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoryScroll}
                    contentContainerStyle={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems:'center'

                    }}>
                    
                    {specialization.map((specialization, index) =>
                        <Pressable key={index} onPress={()=>handleSpecializationChange(specialization)} style={[styles.categoryBtn,
                            selectedSpecilization === specialization ? styles.firstCategoryBtn : {},
                            ]}>
                            
                            <Text style={[
                                styles.categoryBtnText,
                                selectedSpecilization === specialization ? styles.firstCategoryBtnText : {},
                                ]}>{specialization}</Text>  
                            
                    </Pressable>
                        )}
                    </ScrollView>
                    
                </View>
                <View style={styles.foundDoctorView}>
                    {showSearch && (
                        <FoundDoctorCount count={filteredDoctors.length } />
                    )}
                </View>
                <View>
                <ScrollView
                showsVerticalScrollIndicator={false}
             style={[styles.scroll,scrollbackColor]}
              contentContainerStyle={{
            justifyContent: "center",
            paddingBottom: 150,
            paddingTop:20
          }}
                    >
                        {filteredDoctors.length > 0 ? (
                            
                               filteredDoctors.map((doctor: any, index: any) =>
                        
                                    <View key={index} style={styles.componentView}>
                                        <DoctorComponent

                                            imageSource={{uri:doctor.image}}
                                            name={`${doctor.first_name} ${doctor.last_name}`}
                                            iconComponent={<SvgXml xml={blueheart} />}
                                            professionalTitle={doctor.specialization}
                                            hospital={doctor.hospital_name}
                                            star={<SvgXml xml={star} />}
                                            review={doctor.review}
                                            rate={doctor.rate}
                                            addRemoveFavorite={() => handleIconClick(doctor,doctor.id) }

                                        />
                                    </View>
                        
                                )
                            
                        ) : (
                             <NofoundComponent/>   
                    )}
                         

                    </ScrollView>
                     
                </View>
               
                   
            
            </View>
            <RemovefavoritePopup
                userId={patient_id}
                cancel={()=>setShowPopup(false)}
                visible={showpopUp}
                onClose={() => setShowPopup(false)}
                doctor={selectedDoctor}
                updateFavoriteDoctors={updateFavoriteDoctors}
            
            
            />
            <FilterPopup
                cancel={()=>setShowfilter(false)}
                visible={showFilter}
                onClose={() => setShowfilter(false)}
            
            
            
            />
            

             
        </SafeAreaView>
        
    );
}

export default favoriteDoctorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex:1
    },
    outerDark: {
        backgroundColor:"#181A20"
        
    },
    outerLight: {
     backgroundColor: "white",
        
    },
    upper: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
         marginBottom: "7%",
        marginTop: "18%",
    },
    foundDoctorView: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    searchComponent: {
        
    },
    upperInner: {
        width: "95%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    upperLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "70%",
        height:"100%",
    },
    categoryScroll: {
    
    },
    categoryBtnView: {
        display:"flex",
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: "5%",
        backgroundColor: "white",
    },
    categoryBtn: {
        borderWidth: 2,
        borderColor: "#246BFD",
        height: 40,
        paddingHorizontal: 20,
        paddingVertical:7,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft:10
    },
    firstCategoryBtn: {
      backgroundColor:  "#246BFD"
    },
    firstCategoryBtnText: {
      color:"white"  
    },
    categoryBtnText: {
        color: "#246BFD",
        fontSize:16    
    },
    body: {
        width: "98%",
        backgroundColor:"#F7F7F7",
    },
    scroll: {
        width: "100%",
        height: "100%",
        zIndex: 1, 
    },
    scrollDark: {
        backgroundColor:"#181A20"
        
    },
    scrollLight: {
        backgroundColor: "#F7F7F7"
        
    },
    searchView: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    moreOuter: {
       display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    Headstyle: {
        color: "#212121",
        fontWeight: "bold",
        fontSize:20
    },
    NotificationView: {
        width:"80%"
    },
    componentView: {
        marginBottom: "5%",
        width: "100%",
        height:150,
       display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    rightView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        width:"25%"
    },
   
    
})