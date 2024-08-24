const UserInfo = ({ user }) => {
    return (
        <div className='bg-white shadow-md rounded-lg p-6'>
            <h3 className="text-xl font-semibold mb-4">User Information</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Address:</strong> {user?.address}</p>
        </div>
    );
};

export default UserInfo