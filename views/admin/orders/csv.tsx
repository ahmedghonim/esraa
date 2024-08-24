"use client";
import { Button } from "@/ui/button";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { CSVLink } from "react-csv";
import { Trash2, Download } from "lucide-react";
import { deleteAllOrders } from "@/actions/order";
import { EsraAlertDialog } from "@/components/ui";
import { useRouter } from "@/utils/navigation";

function Csv({ data }: { data: any }) {
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();

  return (
    <div className="flex gap-5 items-center">
      <CSVLink data={data}>
        <Button className="bg-primary-100 text-white">
          {t("export_csv")}
          <Download />
        </Button>
      </CSVLink>

      <EsraAlertDialog
        alertTitle="Are you absolutely sure?"
        alertDescription="This action cannot be undone. This will permanently delete the order."
        openTrigger={
          <Button variant="destructive">
            {t("delete_all_orders")}
            <Trash2 />
          </Button>
        }
        isLoading={isPending}
        confirmClassName="bg-red-600"
        onAccept={async () => {
          startTransaction(() => {
            deleteAllOrders();
            router.refresh();
          });
        }}
      />
    </div>
  );
}

export default Csv;
