"use client";

import MembershipMobile from "../view/membership-mobview";
import Membership from "../view/membership.page";

export default function MembershipPage() {
  return (
    <>
      <div className="block md:hidden">
        <MembershipMobile />
      </div>
      <div className="hidden md:block">
        <Membership />
      </div>
    </>
  );
}
