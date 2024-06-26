"use client";
import {
  FriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/lib/actions/friendRequest.actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface Props {
  friendRequest: FriendRequest;
}
function FriendRequestCard({ friendRequest }: Props) {
  const path = usePathname();

  async function handleAccept() {
    await acceptFriendRequest(
      friendRequest["sender"]["_id"],
      friendRequest?.["recipient"],
      path
    );
    console.log(friendRequest);
  }
  async function handleReject() {
    rejectFriendRequest(friendRequest?.["_id"], path);
  }
  return (
    <div className="bg-gray-900 shadow-lg rounded-lg py-4 px-8 mb-4 text-white">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0">
          {/* User Profile Picture */}
          <img
            src={friendRequest.sender.image}
            alt="User Profile Picture"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <Link href={`/profile/${friendRequest.sender?.["_id"]}`}>
          <div
            className="ml-4 cursor-pointer"
            title={`Author: ${friendRequest.sender.name}`}
          >
            {/* User Name */}
            <h2 className="text-xs font-semibold">
              {friendRequest.sender.name}
            </h2>
            {/* Request Message */}
            <p className="text-xs text-gray-400">wants to be your friend</p>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        {/* Accept and Reject Buttons */}
        <button
          onClick={handleAccept}
          className="bg-violet-500/80 text-xs text-white px-4 py-1.5 rounded-md mr-2 hover:bg-violet-500 transition duration-300"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-500/80 text-xs text-white px-4 py-1.5 rounded-md hover:bg-gray-500/60 transition duration-300"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default FriendRequestCard;
