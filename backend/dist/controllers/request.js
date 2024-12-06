import { findRequestByAddress, getRequestById } from "../tools/request-network/pay";
export async function getAllRequests(req, res, next) {
    try {
        const { address } = req.params;
        console.log("request came", address);
        const requests = await findRequestByAddress(address);
        res.status(200).json(requests);
    }
    catch (error) {
        console.error(error);
    }
}
export async function getSingleRequest(req, res, next) {
    try {
        const { requestId } = req.params;
        const request = await getRequestById(requestId);
        res.status(200).json(request);
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVwRixNQUFNLENBQUMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ2xGLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLE1BQU0sUUFBUSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ3BGLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBRWpDLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWhELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0FBQ0gsQ0FBQyJ9