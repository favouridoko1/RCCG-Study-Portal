type LoadingProps = {
  message?: string;
};

 function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-[#00256f]" />

        <p className="text-xs font-medium text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Loading;