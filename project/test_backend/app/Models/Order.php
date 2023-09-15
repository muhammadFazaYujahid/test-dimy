<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'product_id'];
    public function products() {
        return $this->hasMany(Product::class);
    }

    public function payment_method() {
        return $this->hasMany(PaymentMethod::class);
    }

    public function customers() {
        return $this->belongsTo(Customer::class);
    }

    public function customer_address() {
        return $this->belongsTo(CustomerAddress::class);
    }
}
