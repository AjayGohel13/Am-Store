import { db } from "@/lib/db";
export const getAnalysis = async (FuncuserId: string) => {
    try {
        const currentDate = new Date();

        const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const startOfPreviousMonth = new Date(startOfCurrentMonth);
        startOfPreviousMonth.setMonth(startOfPreviousMonth.getMonth() - 1);
        const endOfPreviousMonth = new Date(startOfCurrentMonth);
        endOfPreviousMonth.setDate(0);
        const startOfNextMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const endOfCurrentMonth: Date = new Date(startOfNextMonth);
        endOfCurrentMonth.setDate(startOfNextMonth.getDate() - 1);

        //getting Orders and sales data of Previous Month
        const PreviousMonthAnalysis = await db.orderItem.findMany({
            where: {
                ownerId: FuncuserId,
                isPaid: true,
                createdAt: {
                    lte: endOfPreviousMonth,
                    gte: startOfPreviousMonth,
                }
            },

        })
        //getting Orders and sales data of current Month

        const analysis = await db.orderItem.findMany({
            where: {
                ownerId: FuncuserId,
                isPaid: true,
                createdAt: {
                    gte: endOfPreviousMonth,
                }

            },

        })

        const totalProducts = await db.product.findMany({
            where: {
                userId: FuncuserId,
            }
        })
        //All orders monthly data for charts

        const AllOrdersMonthlyChartData = await db.orderItem.findMany({
            where: {
                ownerId: FuncuserId,
                isPaid: true,
                createdAt: {
                    lte: endOfCurrentMonth,
                    gte: startOfCurrentMonth,
                },
            },
            select: {
                createdAt: true,
                price: true,
                productName: true,
                productId:true,
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        const groupedData = AllOrdersMonthlyChartData.reduce((acc, item) => {
            const date = item.createdAt.toISOString().split('T')[0]; // Extract date part
            if (!acc[date]) {
                acc[date] = { date, totalPrice: 0 };
            }
            acc[date].totalPrice += item.price!;
            return acc;
        }, {} as { [date: string]: { date: string; totalPrice: number } });

        const finalChartData1 = Object.values(groupedData);


        const preMonthData = PreviousMonthAnalysis.reduce((acc, curr) => acc + curr.price!, 0);
        const data = analysis.reduce((accc, curr) => accc + curr.price!, 0)
        const totalSales = analysis.reduce((acc, cur) => acc + cur.number!, 0)
        const products = totalProducts.length;




        //one month product analysis
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      
      
        interface AllProduct {
          productId: string | null;
          price: number | null;
          productName: string | null;
        }
      
        interface GroupedProduct {
          productId: string;
          productName: string | null;
          totalEarnings: number;
          totalSold: number;
        }
      
        const allProducts: AllProduct[] = await db.orderItem.findMany({
          where: {
            ownerId: FuncuserId,
            isPaid: true,
            createdAt: {
              lte: currentDate,
              gte: oneMonthAgo,
            }
          },
          select: {
            productId: true,
            price: true,
            productName: true,
          },
          orderBy: {
            productId: 'asc',
          },
        });
      
        const groupedProducts: Record<string, GroupedProduct> = {};
      
      
        allProducts.forEach((product) => {
      
          if (product.productId === null) {
            return;
          }
          if (!groupedProducts[product.productId]) {
            groupedProducts[product.productId] = {
              productId: product.productId,
              productName: product.productName,
              totalEarnings: 0,
              totalSold: 0,
            };
          }
          groupedProducts[product.productId].totalEarnings += product.price!;
          groupedProducts[product.productId].totalSold += 1;
        });
      
        const finalProduct = Object.values(groupedProducts);
        return {
            data,
            totalSales,
            products,
            preMonthData,
            AllOrdersMonthlyChartData,
            finalChartData1,
            finalProduct
        }
    } catch (error) {
        console.log("[GET_ANALYTICS]", error);
        return {
            data: 0,
            totalRevenue: 0,
            totalSales: 0,
        }
    }
}


