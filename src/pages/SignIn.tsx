import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Lock, Phone, Car, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { authAPI } from "@/lib/api";

const initialState = {
  username: "",
  email: "",
  password: "",
  name: "",
  contactEmail: "",
  phone: "",
  cars: "",
  gender: "",
  needs: "",
};

const genders = [
  { label: "Male", value: "male", icon: <User className="mr-1 h-4 w-4" /> },
  { label: "Female", value: "female", icon: <User className="mr-1 h-4 w-4" /> },
  { label: "Other", value: "other", icon: <UserCircle2 className="mr-1 h-4 w-4" /> },
];

export default function SignIn() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    try {
      const response = await authAPI.register({
        username: form.username,
        email: form.email,
        password: form.password,
        name: form.name,
        contactEmail: form.contactEmail,
        phone: form.phone,
        gender: form.gender,
        needs: form.needs
      });

      if (response.token) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
      setSubmitted(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-vehicle-primary/10 via-white to-vehicle-accent/10 px-2 py-8 pt-20">
        <Card className="max-w-xl w-full shadow-lg animate-fade-from-bottom">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Sign In / Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Set your password"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <hr className="my-1" />
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
                <Label htmlFor="cars">Cars</Label>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="cars"
                    type="text"
                    name="cars"
                    value={form.cars}
                    onChange={handleChange}
                    placeholder="Vehicle(s) owned/interested"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Gender</Label>
                <div className="mt-2">
                  <RadioGroup
                    value={form.gender}
                    onValueChange={val => handleRadioChange("gender", val)}
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
              <Button type="submit" className="w-full mt-2 bg-vehicle-accent hover:bg-vehicle-accent/90 text-white" disabled={submitted}>
                {submitted ? "Processing..." : "Sign In / Register"}
              </Button>
              {submitted && !error && (
                <div className="text-center text-green-700 mt-2">Registration successful! Redirecting...</div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
