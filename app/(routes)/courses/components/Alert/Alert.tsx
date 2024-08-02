import { AlertProps } from "@/app/(user_layout)/account/types";
import { XMarkIcon } from "@/app/components/Icons/XMarkIcon";

export function Alert({
    message,
    severity,
    onHide,
  }: AlertProps & { onHide: () => void }) {
    const severityColors = {
      error: "alert-error",
      success: "alert-success",
      info: "alert-info",
      warning: "alert-warning",
    };
    const alertColor: string =
      severityColors[severity as keyof typeof severityColors] ??
      severityColors.success;
  
    return (
      <div
        className={`alert flex flex-row justify-between items-start gap-5`.concat(
          " ",
          alertColor
        )}
      >
        <div>{message}</div>
        <button className="btn btn-ghost btn-square btn-xs" onClick={onHide}>
          <XMarkIcon />
        </button>
      </div>
    );
  }