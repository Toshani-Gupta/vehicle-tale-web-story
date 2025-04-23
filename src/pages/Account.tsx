import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { List, Car, Wrench, User } from "lucide-react";
import Header from "@/components/Header";

const mockUser = {
  username: "johndoe",
  name: "John Doe",
  email: "johndoe@email.com",
  phone: "+1 555 1234567",
};

const mockVehicles = [
  {
    id: 1,
    make: "Tesla",
    model: "Model S",
    year: 2022,
    vin: "5YJSA1E26JF123456",
    services: [
      {
        date: "2024-03-01",
        type: "Annual Checkup",
        description: "Battery health check & maintenance",
      },
      {
        date: "2023-10-15",
        type: "Tire Replacement",
        description: "Replaced all tires with new set.",
      },
    ],
  },
  {
    id: 2,
    make: "Toyota",
    model: "Camry",
    year: 2019,
    vin: "2T4BF4EK9AC987654",
    services: [
      {
        date: "2024-01-10",
        type: "Oil Change",
        description: "Changed synthetic oil",
      },
    ],
  },
];

export default function Account() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-2 space-y-6 pt-20">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <User className="h-14 w-14 rounded-full bg-purple-100 p-3 text-primary" />
            <div>
              <CardTitle className="text-lg">{mockUser.name}</CardTitle>
              <CardDescription>Username: {mockUser.username}</CardDescription>
              <div className="text-sm text-muted-foreground mt-1">
                <span className="block">{mockUser.email}</span>
                <span className="block">{mockUser.phone}</span>
              </div>
            </div>
          </CardHeader>
        </Card>
        {/* Vehicles */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Car className="h-6 w-6 text-purple-400" /> Registered Vehicles
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {mockVehicles.map(vehicle => (
              <Card key={vehicle.id} className="shadow transition hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{vehicle.make} {vehicle.model} <span className="ml-2 text-base text-muted-foreground font-normal">({vehicle.year})</span></CardTitle>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    VIN: <span className="font-mono">{vehicle.vin}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h3 className="text-md font-medium mb-2 flex items-center gap-1 text-purple-500">
                      <List className="h-4 w-4" /> Service Records
                    </h3>
                    {vehicle.services.length ? (
                      <ul className="space-y-2">
                        {vehicle.services.map((svc, idx) => (
                          <li key={idx} className="bg-gray-50 rounded p-2 border text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <Wrench className="h-4 w-4 text-blue-400" />
                              <span className="font-medium">{svc.type}</span>
                              <Badge className="ml-auto" variant="secondary">{svc.date}</Badge>
                            </div>
                            <div className="ml-6 text-xs text-muted-foreground">{svc.description}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-muted-foreground text-sm">No service records yet.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
