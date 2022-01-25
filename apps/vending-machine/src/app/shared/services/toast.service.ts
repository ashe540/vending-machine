import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  constructor(private toast: ToastrService) {}

  public showSuccess(
    title?: string,
    message?: string,
    options?: Partial<IndividualConfig>
  ): ActiveToast<any> {
    return this.toast.success(message, title, options);
  }

  public showInfo(
    title?: string,
    message?: string,
    options?: Partial<IndividualConfig>
  ): ActiveToast<any> {
    return this.toast.info(message, title, options);
  }

  public showWarning(
    title?: string,
    message?: string,
    options?: Partial<IndividualConfig>
  ): ActiveToast<any> {
    return this.toast.warning(message, title, options);
  }

  public showError(
    title?: string,
    message?: string,
    options?: Partial<IndividualConfig>
  ): ActiveToast<any> {
    return this.toast.error(message, title, options);
  }
}
