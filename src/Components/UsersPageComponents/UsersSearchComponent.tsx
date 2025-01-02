import { twMerge } from "tailwind-merge";

function UsersSearchComponent({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grow">
      <input
        type="text"
        name="searchUsers"
        id="searchUsers"
        placeholder="search"
        className={twMerge("input-field-form", "py-0.5 2xl:py-2")}
        value={query}
        onChange={setQuery}
      />
    </div>
  );
}
export default UsersSearchComponent;
