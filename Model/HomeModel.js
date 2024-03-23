export class ProductsModel{
    constructor(Id, Title,Category,Description,Image,Price){
        this.Id = Id
        this.Title = Title;
        this.Category = Category;
        this.Description = Description;
        this.Image = Image;
        this.Price = Price;
        Rating = new Rating();
    }
}

class Rating {
    Count;
    Rate;
}