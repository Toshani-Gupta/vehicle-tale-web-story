import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

const genders = [
  { label: "Male", value: "male", icon: <User className="mr-1 h-4 w-4" /> },
  { label: "Female", value: "female", icon: <User className="mr-1 h-4 w-4" /> },
  { label: "Other", value: "other", icon: <UserCircle2 className="mr-1 h-4 w-4" /> },
];

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    contactEmail: user?.contactEmail || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    needs: user?.needs || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (value: string) => {
    setForm({ ...form, gender: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await updateProfile(form);
      navigate('/account');
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-vehicle-primary/10 via-white to-vehicle-accent/10 px-2 py-8 pt-20">
        <Card className="max-w-xl w-full shadow-lg animate-fade-from-bottom">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="contactEmail"
                    type="email"
                    name="contactEmail"
                    value={form.contactEmail}
                    onChange={handleChange}
                    placeholder="Contact email"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Gender</Label>
                <div className="mt-2">
                  <RadioGroup
                    value={form.gender}
                    onValueChange={handleRadioChange}
                    className="flex space-x-4"
                    required
                  >
                    {genders.map(g => (
                      <div key={g.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={g.value} id={`gender-${g.value}`} />
                        <Label htmlFor={`gender-${g.value}`} className="flex items-center cursor-pointer">
                          {g.icon} {g.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label>Your Needs</Label>
                <Textarea
                  id="needs"
                  name="needs"
                  value={form.needs}
                  onChange={handleChange}
                  placeholder="Describe your needs (e.g., buying, selling, servicing, etc.)"
                  rows={3}
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/account')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-vehicle-accent hover:bg-vehicle-accent/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 