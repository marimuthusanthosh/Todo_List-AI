import { useRecoilState } from "recoil";
import { filterAtom } from "../store/atoms/filter";

function FilterInput() {
  const [filter, setFilter] = useRecoilState(filterAtom);

  return (
    <div >
      <input
      style={{padding:10, margin: 10}}
        type="text"
        placeholder="Filter todos..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default FilterInput;