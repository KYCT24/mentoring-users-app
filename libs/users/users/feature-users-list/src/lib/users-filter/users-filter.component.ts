import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly usersFacade$: UsersFacade = inject(UsersFacade);
  private readonly formBuilder: FormBuilder = inject(FormBuilder)
  isFormSubmitted = false;
  
  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  });
  
  
  applyFilter() {
    const name = this.form.get('name')?.value?.trim() || '';
    this.usersFacade$.setUsersFilter({ name });
    this.isFormSubmitted = true
  }
  
  resetFilter() {
    this.form.reset();
    this.usersFacade$.setUsersFilter({ name: '' });
    this.isFormSubmitted = false;
  }
}
