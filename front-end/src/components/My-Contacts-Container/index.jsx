import BoxSearchContacts from "../Box-Search-Contacts";
import Contacts from "../Contacts";
import HeaderLeft from "../Header-Left";

export const MyContactsContainer = ({
  account,
  myContacts,
  changeContactSelected,
  sortContactByName,
  myContactsFilter,
  setOpenProfile,
  setOpenNewContat,
}) => {
  return (
    <div>
      <HeaderLeft account={account} setOpenProfile={setOpenProfile} setOpenNewContat={setOpenNewContat} />
      <BoxSearchContacts sortContactByName={sortContactByName} />
      <Contacts
        myContacts={myContacts}
        changeContactSelected={changeContactSelected}
        myContactsFilter={myContactsFilter}
      />
    </div>
  );
};
