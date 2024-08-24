import { Button, Card as AntCard } from 'antd';
import { ShoppingCartOutlined, InfoCircleOutlined, TagsOutlined } from '@ant-design/icons';
const { Meta } = AntCard;

const SimilarProductsSection = ({ similarProducts, navigate }) => (
    <div>
        <h2 className='text-3xl font-bold mb-6 flex items-center'>
            <TagsOutlined className='text-blue-500 mr-2' />
            Similar Products
        </h2>
        {similarProducts.length === 0 ? (
            <p className='text-center text-gray-600'>No similar products found</p>
        ) : (
            <div className='flex flex-wrap gap-6'>
                {similarProducts.map((p) => (
                    <AntCard
                        key={p._id}
                        hoverable
                        cover={
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                alt={p.name}
                                className='object-cover h-40 w-full rounded-t-lg'
                            />
                        }
                        className='transition-transform duration-300 transform hover:scale-105 border border-gray-300 shadow-lg bg-white'
                    >
                        <Meta
                            title={p.name}
                            description={`$${p.price}`}
                            className='text-center mb-4'
                        />
                        <div className='flex justify-between items-center'>
                            <Button
                                type="primary"
                                icon={<InfoCircleOutlined />}
                                onClick={() => navigate(`/product/${p.slug}`)}
                                className='flex items-center gap-2'
                            >
                                More Details
                            </Button>
                            <Button
                                type="default"
                                icon={<ShoppingCartOutlined />}
                                className='flex items-center gap-2'
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </AntCard>
                ))}
            </div>
        )}
    </div>
);

export default SimilarProductsSection;
