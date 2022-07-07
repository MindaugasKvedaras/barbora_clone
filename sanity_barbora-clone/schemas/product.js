export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'amount',
            title: 'Amount',
            type: 'number',
        },
        {
            name: 'units',
            title: 'Units',
            type: 'string',

        },
        {
            name: 'tara',
            title: 'Tara',
            type: 'number',
            initialValue: 0,
        },
        {
            name: 'advertise',
            title: 'Advertise',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'number',
            initialValue: 0,
        },
        {
            name: 'category',
            title: 'Category',
            type:'string',
            options: {
                list: [
                    {title: 'Pieno produktai', value: 'Pieno produktai'},
                    {title: 'Vaisiai ir daržovės', value: 'Vaisiai ir daržovės'},
                    {title: 'Gėrimai', value: 'Gėrimai'},
                    {title: 'Duonos gaminiai ir konditerija', value: 'Duonos gaminiai ir konditerija'},
                    {title: 'Kūdikių prekės', value: 'Kūdikių prekės'},
                    {title: 'Mėsa, žuvis ir kulinarija', value: 'Mėsa, žuvis ir kulinarija'},


                ]
            }
        },
        {
            name: 'popular',
            title: 'Popular',
            type:'string',
            initialValue: 'ne',
            
        },
        {
            name: 'details',
            title: 'Details',
            type: 'array',
            of: [{ type: 'string'}],
        }
    ]
}