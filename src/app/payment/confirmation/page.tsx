import PaymentConfirmation from "@/components/payment-confirmation";

interface PageProps {
    searchParams: { status?: string }
}

export default function PaymentConfirmationPage({ searchParams }: PageProps) {
    return <PaymentConfirmation status={searchParams.status} />
}
