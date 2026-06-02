import { PageHeader } from "@/components/page-header";
import { LeadsTable } from "@/components/leads/leads-table";
import { leads } from "@/lib/mock-data";

export default function LeadsPage() {
  return (
    <>
      <PageHeader
        title="Leads"
        description="Todos os leads capturados pela Malu. Filtre por temperatura e período."
      />
      <div className="px-8 py-8">
        <LeadsTable leads={leads} />
      </div>
    </>
  );
}
