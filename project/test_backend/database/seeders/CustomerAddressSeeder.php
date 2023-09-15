<?php

namespace Database\Seeders;

use App\Models\CustomerAddress;
use Illuminate\Database\Seeder;

class CustomerAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        CustomerAddress::create([
            'customer_id' => 1,
            'address' => $faker->address(),
        ]);
        CustomerAddress::create([
            'customer_id' => 2,
            'address' => $faker->address(),
        ]);
        CustomerAddress::create([
            'customer_id' => 3,
            'address' => $faker->address(),
        ]);
    }
}
