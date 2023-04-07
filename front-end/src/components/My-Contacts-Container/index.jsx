import { BoxSearchContacts } from "../Box-Search-Contacts";
import { HeaderLeft } from "../Header-Left";
import { Contacts } from "../Contacts";

export const MyContactsContainer = () => {
  return (
    <div>
      <HeaderLeft />
      <BoxSearchContacts />
      <Contacts />
    </div>
  );
};
