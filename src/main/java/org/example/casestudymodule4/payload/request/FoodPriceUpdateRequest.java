package org.example.casestudymodule4.payload.request;

public class FoodPriceUpdateRequest {
    private double discountPrice;
    private double originalPrice;
    private double serviceFee;
    private String serviceFeeExplanation;


    public double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public double getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(double serviceFee) {
        this.serviceFee = serviceFee;
    }

    public String getServiceFeeExplanation() {
        return serviceFeeExplanation;
    }

    public void setServiceFeeExplanation(String serviceFeeExplanation) {
        this.serviceFeeExplanation = serviceFeeExplanation;
    }
}