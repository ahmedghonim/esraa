import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { EsraButton } from "./esra_button";
import { UploadButton } from "@/utils/uploadthing";
import { useFormContext } from "react-hook-form";

type Props = {
  className?: string;
  label?: string;
  hideDelete?: boolean;
  name: string;
};

const UploadImage = ({ className, label, hideDelete, name }: Props) => {
  const { setValue, getValues, trigger } = useFormContext();
  const t = useTranslations("common");
  const value = getValues(name);

  if (value) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className={cn(className, "relative")}>
          <Image
            src={value}
            alt="uploaded image"
            className="object-contain w-full h-full"
            fill
          />
        </div>

        {!hideDelete && (
          <EsraButton
            onClick={async () => {
              setValue(name, "");
              trigger(name);
            }}
            className="bg-red-500 hover:bg-red-600 text-white mt-2 w-fit px-2 py-1 rounded-md"
            type="button"
            name={
              <span className="flex items-center gap-2">
                <X className="w-4 h-4" />
                {t("remove")} {t("image")}
              </span>
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/30">
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center w-full h-40 cursor-pointer"
      >
        <FileIcon className="w-8 h-8" />
        <span className="ms-2 text-sm text-gray-500 dark:text-gray-400">
          {t("upload")} {label || t("image")}
        </span>
      </label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setValue(name, res[0].url);
          trigger(name);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadImage;
