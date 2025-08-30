"use client";
import React, { Suspense } from "react";
import TicketReply from "@components/accounts/admin/TicketReply";
import TicketReplySkeleton from "@components/core/skeleton/TicketReplySkeleton";

const page = () => {
  return (
    <Suspense fallback={<TicketReplySkeleton />}>
      <TicketReply />
    </Suspense>
  );
};

export default page;
