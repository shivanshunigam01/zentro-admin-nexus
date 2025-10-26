import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable";
import { Plus, Eye, Edit, Trash2, Loader2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";

const LeadsList = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const API = import.meta.env.VITE_API_URL || "https://api.zentroverse.com/api";

  // ✅ Fetch leads from backend
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(res.data.contacts || []);
    } catch (err) {
      toast({
        title: "Failed to load leads",
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

  // ✅ Format date
  const formatDate = (date: string) =>
    date ? dayjs(date).format("DD MMM YYYY, hh:mm A") : "—";

  // ✅ DataTable columns (All fields)
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "industry",
      label: "Industry",
      render: (value: string) => <Badge variant="secondary">{value}</Badge>,
    },
    { key: "message", label: "Message" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge
          variant={
            value === "unread"
              ? "destructive"
              : value === "read"
              ? "secondary"
              : "default"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "budget",
      label: "Budget",
      render: (value: any) => (value ? `₹${value}` : "—"),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: string) => formatDate(value),
    },
    {
      key: "updatedAt",
      label: "Updated",
      render: (value: string) => formatDate(value),
    },
  ];

  // Cast DataTable to any to allow customActions prop
  const DataTableAny = DataTable as any;

  // ✅ View modal
  const handleView = (lead: any) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  // ✅ Edit modal
  const handleEdit = (lead: any) => {
    setSelectedLead(lead);
    setEditForm({ ...lead });
    setShowEditModal(true);
  };

  const handleEditChange = (e: any) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(`${API}/contacts/${selectedLead._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Lead Updated",
        description: `${editForm.name} updated successfully.`,
      });
      setShowEditModal(false);
      fetchLeads();
    } catch (err) {
      toast({
        title: "Update Failed",
        description: "Could not update this lead.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete modal
  const handleDelete = (lead: any) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/contacts/${selectedLead._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Lead Deleted",
        description: `${selectedLead.name} has been removed.`,
      });
      setShowDeleteModal(false);
      fetchLeads();
    } catch (err) {
      toast({
        title: "Delete Failed",
        description: "Could not delete this lead.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  // --- CSV Export helpers ---
  const csvHeaders = [
    "Name",
    "Email",
    "Phone",
    "Industry",
    "Message",
    "Status",
    "Budget",
    "Created At",
    "Updated At",
  ];

  const toCsvCell = (val: any) => {
    const s =
      val === undefined || val === null
        ? ""
        : Array.isArray(val)
        ? val.join(" | ")
        : String(val);
    return `"${s.replace(/"/g, '""')}"`; // escape quotes
  };

  const buildCsv = (rows: any[]) => {
    const lines = [
      csvHeaders.map(toCsvCell).join(","),
      ...rows.map((r) =>
        [
          r.name ?? "",
          r.email ?? "",
          r.phone ?? "",
          r.industry ?? "",
          (r.message ?? "").replace(/\r?\n/g, " "),
          r.status ?? "",
          r.budget ? `₹${r.budget}` : "",
          r.createdAt ? dayjs(r.createdAt).format("YYYY-MM-DD HH:mm") : "",
          r.updatedAt ? dayjs(r.updatedAt).format("YYYY-MM-DD HH:mm") : "",
        ]
          .map(toCsvCell)
          .join(",")
      ),
    ];
    return lines.join("\r\n");
  };

  const downloadCsv = (filename: string, csvText: string) => {
    const blob = new Blob(["\uFEFF" + csvText], {
      type: "text/csv;charset=utf-8;",
    }); // UTF-8 BOM for Excel
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onExportCsv = () => {
    if (!leads.length) {
      toast({ title: "Nothing to export", description: "No leads available." });
      return;
    }
    const csv = buildCsv(leads);
    const stamp = dayjs().format("YYYYMMDD-HHmmss");
    downloadCsv(`leads-${stamp}.csv`, csv);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-2">
            <Button onClick={onExportCsv}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          <h1 className="text-3xl font-heading font-bold">Leads</h1>
          <p className="text-muted-foreground mt-1">
            All contact form submissions with full details
          </p>
        </div>

        <Button
          onClick={() =>
            toast({ title: "To add a lead", description: "Use contact form." })
          }
          className="gradient-primary text-white shadow-elegant"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* ✅ Show loader or data */}
      {loading ? (
        <div className="flex justify-center items-center py-10 text-muted-foreground">
          <Loader2 className="h-6 w-6 mr-2 animate-spin" />
          Loading leads...
        </div>
      ) : (
        <DataTableAny
          columns={columns}
          data={leads}
          customActions={(lead: any) => (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleView(lead)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleEdit(lead)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDelete(lead)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        />
      )}

      {/* 🟦 View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedLead.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedLead.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedLead.phone || "—"}
              </p>
              <p>
                <strong>Industry:</strong> {selectedLead.industry}
              </p>
              <p>
                <strong>Message:</strong> {selectedLead.message}
              </p>
              <p>
                <strong>Status:</strong> {selectedLead.status}
              </p>
              <p>
                <strong>Budget:</strong> {selectedLead.budget || "—"}
              </p>
              <p>
                <strong>Created:</strong> {formatDate(selectedLead.createdAt)}
              </p>
              <p>
                <strong>Updated:</strong> {formatDate(selectedLead.updatedAt)}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🟩 Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          {editForm && (
            <div className="space-y-3">
              <Input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="Name"
              />
              <Input
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
              />
              <Input
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                placeholder="Phone"
              />
              <Input
                name="industry"
                value={editForm.industry}
                onChange={handleEditChange}
                placeholder="Industry"
              />
              <Textarea
                name="message"
                value={editForm.message}
                onChange={handleEditChange}
                placeholder="Message"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={saveEdit}
              disabled={loading}
              className="gradient-primary text-white"
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🟥 Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedLead?.name}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsList;
