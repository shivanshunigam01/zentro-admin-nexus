import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    message: "",
  });

  const API = import.meta.env.VITE_API_URL || "https://api.zentroverse.com/api";

  // ✅ Fetch lead if editing
  useEffect(() => {
    if (id) {
      const fetchLead = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API}/contacts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setForm({
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            industry: res.data.industry || "",
            message: res.data.message || "",
          });
        } catch (err) {
          toast({
            title: "Error loading lead",
            description: "Could not fetch lead details.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchLead();
    }
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit (create or update)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (id) {
        await axios.put(`${API}/contacts/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({
          title: "Lead Updated",
          description: `${form.name}'s details were updated successfully.`,
        });
      } else {
        await axios.post(`${API}/contacts/create`, form);
        toast({
          title: "Lead Created",
          description: `${form.name} was added successfully.`,
        });
      }

      navigate("/leads");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error saving lead",
        description: "Please check the inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-2xl font-heading font-bold">
            {id ? "Edit Lead" : "Add New Lead"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Name
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter lead name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="lead@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Phone
              </label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91XXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Industry
              </label>
              <Input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="e.g., Technology, FMCG, Logistics"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Message / Requirement
              </label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter message or requirements"
                rows={4}
                required
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/leads")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="gradient-primary text-white shadow-elegant"
                disabled={loading}
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {id ? "Update Lead" : "Create Lead"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadForm;
