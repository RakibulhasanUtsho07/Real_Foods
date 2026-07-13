import EditProductModal from "@/components/admin/EditProductForm";
import { specificProduct } from "@/lib/api/action/action";



interface Props {
  params: Promise<{ _id: string }>;
}

async function ManageProductPage({ params }: Props) {
  const { _id } = await params;

  // Fetching data directly on the server
  const product = await specificProduct(_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="text-center md:text-left border-b border-amber-100 pb-5 mb-6">
          <h1 className="text-3xl font-bold text-amber-900 font-serif">Manage Bakery Inventory 🥖</h1>
          <p className="text-amber-700/70 text-sm mt-1">
            Edit item descriptions, live pricing, stocks, and expiration data quickly.
          </p>
        </div>

        {/* Pass a single product, and the id needed for the update call */}
        <EditProductModal product={product} productId={_id} />
      </div>
    </div>
  );
}

export default ManageProductPage;