import { supabase } from "@/lib/supabase";

interface Session {
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
}

interface SetUserData {
  (user: User): void;
}

export async function getPatientData(
  supabase: any,
  userInfo: any
): Promise<any> {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error fetching session:", sessionError);
      return;
    }

    const user = session?.user;

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    userInfo(user);
  } catch (error) {
    console.error("Error while fetching session:", error);
    return;
  }
}

export async function fetchPatientData(id: string, patentInfo: any) {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select(`*`)
      .eq("auth_id", id);
    if (error) {
      console.error("Error fetching patient data:", error);
      return;
    }
    patentInfo(data);
    // console.log(data)
  } catch (error) {
    console.error("Error while fetching data:", error);
    return;
  }
}

export async function getUserImageUrl(
  storageName: string,
  userId: any,
  imageUrlState: any
) {
  const { data, error } = await supabase.storage
    .from(storageName)
    .list(userId + "/", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error(error);
    return;
  } else {
    imageUrlState(data?.[0] ?? null);
  }
}
