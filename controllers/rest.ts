//import context of request and responses from deno
import { Context } from 'https://deno.land/x/oak/mod.ts'
//import db config
import db from '../db/mongo.ts';
//import interface
import BrandModel from '../models/brand.ts';
//import validations 
import {isString} from '../validator/validator.ts';

const Brand = db.collection<BrandModel>('brands');

//@desc get all brands
//@route GET /brands
const getBrands = async ({ request, response }: Context)  =>  {
    const brands = await Brand.find();
    
    response.status = 200;
    response.body = {
      success: true,
      data: brands,
    };
};

//@desc add a brand
//@route POST /brand
const createBrand = async ({request, response} : Context)  =>  {
    
    const bodyData = await request.body().value;

    if(!request.hasBody){
      response.status = 404;
      
      response.body = {
        success: false,
        data: "No data provided",
      };
    }
    else{
      if(isString(bodyData.name)){
        
        let brand : BrandModel = {
          name : bodyData.name,
          products : []
        }
        
        await Brand.insertOne( 
          brand
        )
        
        response.status = 201;
        response.body = {
          success: "Success with creating the brand",
        };
        
      }
      else{
        response.status =404;
        response.body = {
          success: "Type of data is incorrect",
        };
      }
    }
}

export {
  getBrands,
  createBrand
};