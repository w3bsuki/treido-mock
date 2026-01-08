import React from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageUrl: string;
  tag?: string;
  isFavorite: boolean;
  location: string;
  condition: 'New' | 'Like New' | 'Good' | 'Used';
  postedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Filter {
  id: string;
  label: string;
  icon?: React.ReactNode;
}