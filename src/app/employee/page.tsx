"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeRoot() {
  const { isFirstLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If they land on /employee directly, send them to dashboard or onboarding
    if (isFirstLogin) {
      router.push("/employee/dashboard"); // They shouldn't really be here without entering a password, but dashboard is safe as it's the main entry.
    } else {
      router.push("/employee/dashboard");
    }
  }, [isFirstLogin, router]);

  return null;
}
