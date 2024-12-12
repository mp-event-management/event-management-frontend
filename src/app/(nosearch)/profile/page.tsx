"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

const ProfilePage: FC = () => {
  const { data: session } = useSession();
  const profileImageUrl = session?.user.profilePictureUrl;
  const referralCode = "REFERRAL";
  const { toast } = useToast();
  console.log(session);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "You referral code copied" });
  };

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Container>
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">My profile</h1>
        </div>

        <div className="bg-slate-50 h-[calc(100vh-300px)] mt-16 w-full rounded-xl items-center justify-center p-12 flex flex-col gap-12">
          <div className="w-[230px] h-[230px]">
            <Image
              src={
                profileImageUrl
                  ? profileImageUrl
                  : "https://placehold.co/260x260"
              }
              alt="Profile Image"
              height={230}
              width={230}
              className="object-cover h-full w-full rounded-full"
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <h3 className="text-[22px] font-extrabold">{session?.user.name}</h3>
            <p className="text-[16px]">
              {session?.user.roles[0].includes("ROLE_ORGANIZER")
                ? "ORGANIZER"
                : "CUSTOMER"}
            </p>
          </div>
          {session?.user.roles[0].includes("ROLE_CUSTOMER") && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg">Your referral code</p>
              <div className="flex gap-2 items-center">
                <p className="bg-green-100 px-6 py-2 text-lg font-bold">
                  {referralCode}
                </p>
                <Button
                  onClick={() => handleCopyCode(referralCode)}
                  variant="notFull"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
