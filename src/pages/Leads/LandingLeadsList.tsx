import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Eye, Loader2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Lead = {
  _id: string;
  name: string;
  contact: string;
  email: string;
  state?: string;
  city?: string;
  pincode?: string;
  vehicleModels?: string[];
  source?: string;
  expectedMonth?: string; // YYYY-MM
  message?: string;
  ctaSource?: string;
  status?: "new" | "in_progress" | "closed";
  createdAt?: string;
  updatedAt?: string;
};

const API = import.meta.env.VITE_API_URL || "https://api.zentroverse.com/api";

const formatDate = (d?: string) =>
  d ? dayjs(d).format("DD MMM YYYY, hh:mm A") : "—";

const statusBadge = (v?: Lead["status"]) => {
  switch (v) {
    case "new":
      return <Badge variant="destructive">new</Badge>;
    case "in_progress":
      return <Badge>in_progress</Badge>;
    case "closed":
      return <Badge variant="secondary">closed</Badge>;
    default:
      return <Badge variant="outline">—</Badge>;
  }
};

const LandingLeadsList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [openView, setOpenView] = useState(false);
  const [q, setQ] = useState("");

  // NEW: dialog to show all models when >3
  const [openModelsDialog, setOpenModelsDialog] = useState(false);
  const [modelsForLead, setModelsForLead] = useState<string[]>([]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/landing-leads`);
      const data: Lead[] = Array.isArray(res.data?.data) ? res.data.data : [];
      setLeads(data);
    } catch {
      toast({
        title: "Failed to load landing leads",
        description: "Could not connect to the server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((l) =>
      [
        l.name,
        l.email,
        l.contact,
        l.city,
        l.state,
        l.pincode,
        l.source,
        l.ctaSource,
        ...(l.vehicleModels || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [leads, q]);

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "contact",
      label: "Phone",
      render: (v: string) =>
        v ? <span className="font-medium">{v}</span> : "—",
    },
    { key: "email", label: "Email" },
    {
      key: "location",
      label: "Location",
      render: (_: any, row: Lead) =>
        row.city || row.state || row.pincode ? (
          <span>
            {row.city || "—"}, {row.state || "—"}{" "}
            {row.pincode ? `(${row.pincode})` : ""}
          </span>
        ) : (
          "—"
        ),
    },
    {
      key: "vehicleModels",
      label: "Models",
      render: (arr?: string[], row?: Lead) => {
        const models = Array.isArray(arr) ? arr : [];
        if (!models.length) return "—";

        const firstThree = models.slice(0, 3);
        const extra = models.length - firstThree.length;

        return (
          <div className="flex flex-wrap items-center gap-1 max-w-[360px]">
            {firstThree.map((m, i) => (
              <Badge key={`${row?._id || "row"}-m-${i}`} variant="secondary">
                {m}
              </Badge>
            ))}
            {extra > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="h-6 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setModelsForLead(models);
                  setOpenModelsDialog(true);
                }}
                title="View all selected models"
              >
                +{extra}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      key: "expectedMonth",
      label: "Month",
      render: (v?: string) => (v ? dayjs(v).format("MMM YYYY") : "—"),
    },
    {
      key: "ctaSource",
      label: "CTA",
      render: (v?: string) => (v ? <Badge variant="outline">{v}</Badge> : "—"),
    },
    {
      key: "source",
      label: "Lead Source",
      render: (v?: string) => (v ? <Badge variant="outline">{v}</Badge> : "—"),
    },
    {
      key: "status",
      label: "Status",
      render: (_: any, row: Lead) => statusBadge(row.status),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (v?: string) => formatDate(v),
    },
  ];

  // Cast DataTable to any to allow customActions prop
  const DataTableAny = DataTable as any;

  const onView = (lead: Lead) => {
    setSelected(lead);
    setOpenView(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Landing Leads</h1>
          <p className="text-muted-foreground mt-1">
            Submissions from the Diwali & Chhath landing page
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search name, phone, email, city, model…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-72"
          />
          <Button variant="outline" onClick={fetchLeads} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-10 text-muted-foreground">
          <Loader2 className="h-6 w-6 mr-2 animate-spin" />
          Loading leads…
        </div>
      ) : (
        <DataTableAny
          columns={columns}
          data={filtered}
          customActions={(lead: Lead) => (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onView(lead)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          )}
        />
      )}

      {/* View selected lead */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selected.name}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Phone:</strong> {selected.contact || "—"}
              </p>
              <p>
                <strong>Location:</strong> {selected.city || "—"},{" "}
                {selected.state || "—"}{" "}
                {selected.pincode ? `(${selected.pincode})` : ""}
              </p>
              <p>
                <strong>CTA:</strong> {selected.ctaSource || "—"}
              </p>
              <p>
                <strong>Lead Source:</strong> {selected.source || "—"}
              </p>
              <p>
                <strong>Expected Month:</strong>{" "}
                {selected.expectedMonth
                  ? dayjs(selected.expectedMonth).format("MMMM YYYY")
                  : "—"}
              </p>
              <p>
                <strong>Models:</strong>{" "}
                {selected.vehicleModels?.length
                  ? selected.vehicleModels.join(", ")
                  : "—"}
              </p>
              <p>
                <strong>Status:</strong> {selected.status || "new"}
              </p>
              <p>
                <strong>Message:</strong> {selected.message || "—"}
              </p>
              <p>
                <strong>Created:</strong> {formatDate(selected.createdAt)}
              </p>
              <p>
                <strong>Updated:</strong> {formatDate(selected.updatedAt)}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setOpenView(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All models dialog (opens when clicking +N) */}
      <Dialog open={openModelsDialog} onOpenChange={setOpenModelsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Selected Models</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {modelsForLead.map((m, i) => (
              <Badge key={`${m}-${i}`} variant="secondary">
                {m}
              </Badge>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenModelsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingLeadsList;
