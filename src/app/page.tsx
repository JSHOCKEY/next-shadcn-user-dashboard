"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Dashboard() {
  type Activity = {
    datetime: string;
    action: string;
  };

  const [name, setName] = useState<string>('John Shockey');
  const [updatedName, setUpdatedName] = useState<string>(name);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [activityList, setActivityList] = useState<Activity[]>([
    { datetime: "3/30/2025, 9:10:05 AM", action: "Logged In" },
    { datetime: "3/29/2025, 9:18:50 AM", action: "Updated Profile Name" },
    { datetime: "3/29/2025, 9:15:30 AM", action: "Logged In" },
    { datetime: "3/28/2025, 8:30:45 AM", action: "Account Created" }
  ]);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

  const createNewActivity = (action: string) => {
    const newActivity = { datetime: new Date().toLocaleString(), action }
    setActivityList((prevList) => [newActivity, ...prevList]);
  };

  const updateProfileName = (updatedName: string) => {
    createNewActivity('Updated Profile Name');
    setName(updatedName);
    setProfileModalOpen(false);
  }

  const updateNotifications = () => {
    createNewActivity('Updated Profile Notificiations');
    setNotificationsEnabled(prevState => !prevState);
  }

  const formatInitials = (name: string) => {
    let initials = "";
    const words = name.split(" ");

    for (let i = 0; i < words.length; i++) {
      initials = initials + words[i][0];
    }
    return initials;
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="w-50 min-h-screen bg-black relative">
          <nav className="w-50 text-white p-4 min-h-screen bg-black">
            <ul>
              <li className="p-2 hover:bg-red-700 rounded cursor-pointer">Home</li>
              <li className="p-2 hover:bg-red-700 rounded cursor-pointer">Dashboard</li>
              <li className="p-2 hover:bg-red-700 rounded cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-red-700 rounded cursor-pointer">Settings</li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="xl:items-stretch">
              <Card className="mb-6">
                <CardContent>
                  <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
                  <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-y-2 gap-x-4">
                    <Avatar className="w-[80px] h-[80px] flex items-center justify-center">
                      <AvatarImage src="/avatar.png" alt="User Avatar" className="w-full h-auto" />
                      <AvatarFallback className="w-full h-[80px] flex items-center justify-center bg-gray-200 text-2xl">
                        {formatInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-red-700 text-lg">
                      <span className="font-bold">{name}</span> | Admin</p>
                  </div>
                  <Button className="mt-4" onClick={() => setProfileModalOpen(true)}>Edit Profile</Button>
                </CardContent>
              </Card>

              <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold mb-2">Edit Profile</DialogTitle>
                    <Input placeholder="Enter name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setProfileModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => updateProfileName(updatedName)}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1">
                  <CardContent>
                    <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                    <div className="flex items-center space-x-4">
                      <span>Email Notifications</span>
                      <Switch
                        className="cursor-pointer"
                        checked={notificationsEnabled}
                        onCheckedChange={() => updateNotifications()}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardContent>
                    <h2 className="text-xl font-bold mb-4">Invite Team Members</h2>
                    <Button onClick={() => setInviteModalOpen(true)}>Invite Member</Button>
                  </CardContent>
                </Card>

                <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-lg font-bold mb-2">Invite Team Member</DialogTitle>
                      <Input placeholder="Enter email address" />
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setInviteModalOpen(false)}>Cancel</Button>
                      <Button>Send Invitation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Card className="xl:items-stretch">
              <CardContent>
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <ul className="space-y-2" id="activity-list">
                  {
                    activityList.map((activity, i) => (
                      <li key={`item-${i}`} className="p-2 border rounded bg-gray-50">{activity.datetime} - {activity.action}</li>
                    ))
                  }
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
