interface Props {
  description: string;
  setDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form = ({ description, setDescription }: Props) => {
  return (
    <form>
      <h2 className="text-slate-950 text-xl mb-4">Create a new task</h2>
      <input
        type="text"
        placeholder="Description"
        className="border border-slate-800 p-1 rounded-lg  text-black"
        value={description}
        onChange={setDescription}
      />
    </form>
  );
};
