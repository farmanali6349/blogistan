import React from "react";
import { PageTitle, General, Social, Password } from "../components/index";
import { useSelector } from "react-redux";
function EditAccount() {
  const author = useSelector((state) => state.AuthorsReducer.currentAuthor);
  return (
    <div className="edit-account">
      <PageTitle title={"Edit Account"} description={"Edit your account"} />

      <div className="edit-account-forms container">
        <General name={author?.name} email={author?.email} bio={author?.bio} />
        <Social
          facebook={author?.facebook}
          instagram={author?.instagram}
          linkedin={author?.linkedin}
          x={author?.x}
          medium={author?.medium}
        />
        <Password />
      </div>
    </div>
  );
}

export default EditAccount;
