import { useState } from 'react';
import DashboardTable from "./DashBoardTable"
import FollowingListTable from "./FollowingListTable"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import './table.css';
import { Plus, Search } from 'lucide-react';

function FollowCoinMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <form className="w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search coins..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-2/3"
              />
            </div>
          </form>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export function Dashboard() {
  const [activeTab, setActiveTab] = useState("monedas"); // Estado para la pestaña activa
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="pt-6 px-6">
        <div className="flex flex-row items-center">
          <TabsList className="grid w-full grid-cols-2 w-[400px]">
            <TabsTrigger value="monedas">Monedas</TabsTrigger>
            <TabsTrigger value="seguimiento">Lista de seguimiento</TabsTrigger>
          </TabsList>
          {activeTab === "seguimiento" && (
            <div className="ml-auto pr-4">
              <FollowCoinMenu />
            </div>
          )}
        </div>
        <TabsContent value="monedas">
          <DashboardTable />
        </TabsContent>
        <TabsContent value="seguimiento">
          <FollowingListTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
