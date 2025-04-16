import { Button, Spinner } from '@material-tailwind/react';

export default function ButtonLoading({ children }) {
  return (
    <div className="item flex flex-wrap justify-center gap-4">
      <Button variant="gradient" className="gap-2">
        <Spinner size="sm" />
        {children}
      </Button>
    </div>
  );
}
