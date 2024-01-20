import { AddProductForm } from '@/components/Form/AddProductForm';

const CreateProduct = () => {
  return (
    <div className='fixed inset-0 z-50 bg-background/50 backdrop-blur-sm'>
      <AddProductForm />
    </div>
  );
};

export default CreateProduct;
