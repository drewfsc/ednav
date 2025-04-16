import { Button } from '@material-tailwind/react';

export default function ButtonNotLoading({ handleSubmit, children }) {
  return (
    <div className="item flex flex-wrap justify-center gap-4">
      <Button variant="gradient" onClick={handleSubmit}>{children}</Button>
    </div>
  );
}
