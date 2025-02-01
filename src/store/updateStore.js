import { useDispatch, useSelector } from "react-redux";
import databaseService from "../services/database";
import { setCurrentAuthor } from "./features/authorsSlice";

const user = useSelector((state) => state.AuthReducer.userData);
const dispatch = useDispatch();

export default async function updateStore() {
  if (user) {
    const author = await databaseService.getAuthor({ $id: user.$id });
    if (author) {
      useDispatch(setCurrentAuthor(author));
    }
  }
}
