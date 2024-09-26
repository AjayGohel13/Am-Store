import { db } from "@/lib/db";

export const getAdminAnalisis = async () => {
    const currentDate = new Date();
    const startOfPreviousWeek = new Date(currentDate);
    const preday = currentDate.getDay(); // Get the current day of the week (0-6)
    const prediff = currentDate.getDate() - preday - 6; // Adjust to the previous Monday
    startOfPreviousWeek.setDate(prediff);
    startOfPreviousWeek.setHours(0, 0, 0, 0); // Set time to the start of the day
  
    const endOfPreviousWeek = new Date(startOfPreviousWeek);
    endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6); // Add 6 days to get to Sunday
    endOfPreviousWeek.setHours(23, 59, 59, 999); // Set time to the end of the day
  
  
    const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startOfPreviousMonth = new Date(startOfCurrentMonth);
    startOfPreviousMonth.setMonth(startOfPreviousMonth.getMonth() - 1);
    const endOfPreviousMonth = new Date(startOfCurrentMonth);
    endOfPreviousMonth.setDate(0);
    const startOfNextMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const endOfCurrentMonth: Date = new Date(startOfNextMonth);
    endOfCurrentMonth.setDate(startOfNextMonth.getDate() - 1);
  
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    const visitors = await db.visit.findMany({
      where: {
        createdAt: {
          lte: currentDate,
          gte: oneMonthAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    type GroupedVisitor = {
      createdAt: Date;
      number: number | null;
    };
    const groupedVisitor01s = visitors.reduce((acc, visitor) => {
      const date = visitor.createdAt!.toISOString().split('T')[0]; // Extract the date part
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {} as { [date: string]: number });
  
    const result: GroupedVisitor[] = Object.entries(groupedVisitor01s).map(([date, count]) => ({
      createdAt: new Date(date),
      number: count,
    }));
  
    const allVisitor = await db.visit.findMany({
      orderBy: {
        createdAt: "asc"
      }
    })
  
    //this month orders
    const orderItem = await db.orderItem.count()
  
    const thisMonthOrder = await db.orderItem.findMany({
      where: {
        isPaid: true,
        createdAt: {
          lte: endOfPreviousWeek,
          gte: startOfPreviousWeek,
        },
      },
      select: {
        createdAt: true,
        price: true,
        productName: true,
        productId: true,
        number: true,
      },
      orderBy: {
        createdAt: "asc"
      }
    })
  
  
    //Orders analysis
  
  
    interface AllProduct {
      productId: string | null;
      price: number | null;
      productName: string | null;
      store_name: string | null;
      number: number;
    }
  
    interface GroupedProduct {
      productId: string;
      productName: string | null;
      totalEarnings: number;
      totalSold: number;
    }
  
    interface GroupedByStore {
      store_name: string;
      totalEarnings: number;
      totalSold: number;
    }
    const preViousWeek: AllProduct[] = await db.orderItem.findMany({
      where: {
        isPaid: true,
      },
      orderBy: {
        createdAt: "asc"
      }
    })
  
    const gropByStore: Record<string, GroupedByStore> = {};
  
    preViousWeek.forEach((prod) => {
      if (prod.store_name === null) {
        return;
      }
      if (!gropByStore[prod.store_name]) {
        gropByStore[prod.store_name] = {
          store_name: prod.store_name,
          totalEarnings: 0,
          totalSold: 0,
        };
      }
      gropByStore[prod.store_name].totalEarnings += prod.price!;
      gropByStore[prod.store_name].totalSold += 1;
    });
  
    const finalDataForStore = Object.values(gropByStore)
  
    const groupedProducts: Record<string, GroupedProduct> = {};
    preViousWeek.forEach((product) => {
  
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
  
    const finalData = Object.values(groupedProducts);

    return{
        finalData,
        finalDataForStore,
        orderItem,
        thisMonthOrder,
        result,
        preViousWeek,
        visitors,
        allVisitor
    }
  
}