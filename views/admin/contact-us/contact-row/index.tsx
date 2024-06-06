"use client";
import React, { useTransition } from "react";
import Delete from "@/svg/delete.svg";
import { Eye, EyeOff } from "lucide-react";
import { EsraButton } from "@/components/ui";
import { Contact } from "@prisma/client";
import { useRouter } from "@/utils/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTranslations } from "use-intl";
import { deleteContact, updateContactToRead } from "@/actions/contact";

export default function ContactUSRow({
  name,
  message,
  phone,
  id,
  isRead,
}: Contact) {
  const { toast } = useToast();
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const onDelete = () => {
    startTransaction(() => {
      deleteContact(+id || 0)
        .then(() => {
          toast({
            title: "Deleted",
            description: "Product deleted successfully",
          });
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
    });
  };
  return (
    <>
      <td className="py-4 text-center">{name} </td>
      <td className="py-4 text-center">{phone} </td>

      <td className="py-4 text-center">{message}</td>
      <td className="py-4 text-center flex justify-center items-center">
        {isRead ? <Eye /> : <EyeOff />}
      </td>

      <td className="py-4">
        <div className="flex justify-center items-center gap-4">
          {/* delete alert */}
          <EsraButton
            className="bg-transparent"
            name={<Delete />}
            onClick={() => {
              toast({
                title: "Are you sure?",
                description: "This action is irreversible",

                action: (
                  <ToastAction altText="Delete" onClick={() => onDelete()}>
                    {t("delete")}
                  </ToastAction>
                ),
              });
            }}
          />
          {!isRead && (
            <EsraButton
              className="bg-transparent"
              name={<Eye />}
              onClick={() => {
                startTransaction(() => {
                  updateContactToRead(+id).then(() => {
                    toast({
                      title: t("read"),
                      description: t("message_read"),
                    });
                  });
                });
              }}
            />
          )}
        </div>
      </td>
    </>
  );
}
