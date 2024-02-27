import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExpensePage({ params }: { params: { id: string } }) {
  
  return (
    <div className="flex min-w-full flex-col items-center justify-start p-12">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
