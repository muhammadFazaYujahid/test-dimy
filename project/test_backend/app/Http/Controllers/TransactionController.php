<?php

namespace App\Http\Controllers;

use App\Models\transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "customer_address" => "required",
            "order_id" => "required",
            "payment_method" => "required",
        ]);
        
        foreach ($request->payment_method as $payment_method) {
            $order = transaction::create([
                "customer_address" => $request->customer_address,
                "order_id" => $request->order_id,
                "payment_method" => $payment_method,
            ]);
    }

    return response()->json([
        "message" => "Transaction Success"
    ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transaction = DB::table('transactions')
                        ->join('orders', 'transactions.order_id', '=', 'orders.id')
                        ->join('customer_addresses', 'transactions.customer_address', '=', 'customer_addresses.id')
                        ->join('payment_methods', 'transactions.payment_method', '=', 'payment_methods.id')
                        ->join('customers', 'customers.id', '=', 'customer_addresses.customer_id')
                        ->join('products', 'products.id', '=', 'orders.product_id')
                        ->select('customers.customer_name','products.name','products.price' ,'payment_methods.name as payment_method', 'customer_addresses.address as customer_address')
                        ->where('transactions.id', $id)
                        ->get();
        
        return response()->json($transaction);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
