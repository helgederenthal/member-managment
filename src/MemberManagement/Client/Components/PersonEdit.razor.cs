using Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;
using MemberManagement.Client.Shared;

namespace MemberManagement.Client.Components
{
    public partial class PersonEdit
    {
        [Parameter]
        public int? Id { get; set; } = default!;

        [Inject]
        public IPersonDataService PersonDataService { get; set; } = default!;

        [Inject]
        private Utilities Utilities { get; set; } = default!;

        public Person? Person { get; set; } = default!;
        public Person? EditedPerson { get; set; } = default!;

        public string SubmitButtonText { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            if(Id != null)
            {
                Person = await PersonDataService.GetPerson((int)Id);
                if(Person != null)
                {
                    EditedPerson = Person.Clone();
                }
                SubmitButtonText = "Save";
            }
            else
            {
                EditedPerson = new Person { LastName = "", FirstName = "" };
                SubmitButtonText = "Create";
            }
        }

        protected async Task HandleValidSubmit()
        {
            if(EditedPerson != null)
            {
                await PersonDataService.UpdatePerson(EditedPerson);

                Utilities.NavigateTo($"person/{EditedPerson.PersonId}");
            }
        }

        public void CancelButtonClicked()
        {
            if (EditedPerson != null)
            {
                Utilities.NavigateTo($"person/{EditedPerson.PersonId}");
            }
        }

        public void ResetButtonClicked()
        {
            if(EditedPerson != null)
            {
                if(Person != null)
                {
                    EditedPerson.Copy(Person);
                }
                else
                {
                    EditedPerson = new Person { LastName = "", FirstName = "" };
                }
            }
        }
    }
}
