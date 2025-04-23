import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { List, Car, Wrench, User, Edit2 } from "lucide-react";
import Header from "@/components/Header";
import { vehicleAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Service {
  date: string;
  type: string;
  description: string;
  _id: string;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  services: Service[];
}

export default function Account() {
  const { user, logout } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles
        const vehiclesData = await vehicleAPI.getVehicles();
        setVehicles(vehiclesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto py-8 px-2 space-y-6 pt-20">
          <div className="text-center">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto py-8 px-2 space-y-6 pt-20">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-2 space-y-6 pt-20">
        {/* Profile Card */}
        {user && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <User className="h-14 w-14 rounded-full bg-purple-100 p-3 text-primary" />
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription>Username: {user.username}</CardDescription>
                  <div className="text-sm text-muted-foreground mt-1">
                    <span className="block">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/account/edit')}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}
        {/* Vehicles */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Car className="h-6 w-6 text-purple-400" /> Registered Vehicles
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {vehicles.map(vehicle => (
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
                        {vehicle.services.map((svc) => (
                          <li key={svc._id} className="bg-gray-50 rounded p-2 border text-sm">
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
