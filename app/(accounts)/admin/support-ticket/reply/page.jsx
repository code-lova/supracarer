"use client";
import React, { Suspense } from "react";
import TicketReply from "@components/accounts/admin/TicketReply";
import TicketReplySkeleton from "@components/core/skeleton/TicketReplySkeleton";

export const metadata = {
  title: "Ticket Reply - Supracarer",
  description: "Admin ticket reply - Supracarer",
};

const page = () => {
  return (
    <Suspense fallback={<TicketReplySkeleton />}>
      <TicketReply />
    </Suspense>
  );
};

export default page;
