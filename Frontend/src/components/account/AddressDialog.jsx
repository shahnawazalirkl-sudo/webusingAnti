import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const INITIAL_FORM = {
  label: 'Home Residence',
  recipient: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  isDefault: false
};

const AddressDialog = ({ open, onOpenChange, onSaveAddress, editingAddress }) => {
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    if (editingAddress) {
      setForm(editingAddress);
    } else {
      setForm(INITIAL_FORM);
    }
  }, [editingAddress, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.recipient.trim() || !form.street.trim() || !form.city.trim()) return;
    onSaveAddress(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingAddress ? 'Edit Delivery Venue / Address' : 'Add Delivery Venue / Address'}
          </DialogTitle>
          <DialogDescription>
            Specify your celebration residence, banquet gate, or destination suite for white-glove consignment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 py-1">
          <div className="space-y-1">
            <Label htmlFor="addr-label">Address Label</Label>
            <Input
              id="addr-label"
              placeholder="e.g. Udaivilas Suite / Home Residence"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="addr-recipient">Recipient Name</Label>
              <Input
                id="addr-recipient"
                placeholder="Full name"
                value={form.recipient}
                onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="addr-phone">Contact Phone</Label>
              <Input
                id="addr-phone"
                placeholder="+91..."
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="addr-street">Street / Hotel / Venue Gate</Label>
            <Input
              id="addr-street"
              placeholder="Address line & landmark"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <Label htmlFor="addr-city">City</Label>
              <Input
                id="addr-city"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="addr-state">State</Label>
              <Input
                id="addr-state"
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="addr-pincode">PIN Code</Label>
              <Input
                id="addr-pincode"
                placeholder="313001"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              id="addr-default"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
            />
            <Label htmlFor="addr-default" className="text-xs cursor-pointer text-on-surface font-normal normal-case">
              Set as primary dispatch address for one-click checkout
            </Label>
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
